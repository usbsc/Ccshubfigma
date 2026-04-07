import { useEffect, useMemo, useState } from "react";

type NfhsApiResponse<T> = {
  items?: T[];
};

type NfhsApiEventItem = {
  key?: string;
  title?: string;
  sport?: string;
  start_time?: string;
  payment_required?: string;
  publishers?: NfhsApiPublisher[];
};

type NfhsApiPublisher = {
  state_association_acronym?: string;
  headline_short_name?: string;
  formatted_name?: string;
  slug?: string;
  broadcasts?: NfhsApiBroadcast[];
};

type NfhsApiBroadcast = {
  key?: string;
  game_key?: string;
  start_time?: string;
  status?: string;
  is_live?: boolean;
  view_url?: string;
  payment_required?: string;
  subheadline?: string;
};

export type NfhsBroadcastStatus = "live" | "scheduled" | "complete" | "unknown";

export type NfhsBroadcast = {
  id: string;
  gameKey?: string;
  title: string;
  startTime: string;
  status: NfhsBroadcastStatus;
  pageUrl: string;
  paymentRequired: boolean;
  publisherName?: string;
  publisherSlug?: string;
};

function parseBool(v: unknown) {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.trim().toLowerCase() === "true";
  return false;
}

function toHttps(url: string) {
  return url.replace(/^http:\/\//i, "https://");
}

function deriveStatus(b: NfhsApiBroadcast): NfhsBroadcastStatus {
  if (b.is_live) return "live";

  const s = (b.status || "").trim().toLowerCase();
  if (s.includes("live")) return "live";
  if (s.includes("sched")) return "scheduled";
  if (s.includes("complete")) return "complete";
  return "unknown";
}

export function useNfhsCifccsBroadcasts(options?: {
  /** Refresh interval; defaults to hourly. */
  refreshMs?: number;
  /** How many results to request from the API. */
  size?: number;
}) {
  const refreshMs = options?.refreshMs ?? 60 * 60 * 1000;
  const size = options?.size ?? 50;

  const [broadcasts, setBroadcasts] = useState<NfhsBroadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const url = useMemo(() => {
    const u = new URL("https://search-api.nfhsnetwork.com/v3/search/events");
    u.searchParams.set("search_term", "CIFCCS football");
    u.searchParams.set("size", String(size));
    return u.toString();
  }, [size]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`NFHS request failed: HTTP ${res.status}`);
        }

        const json = (await res.json()) as NfhsApiResponse<NfhsApiEventItem>;
        const out: NfhsBroadcast[] = [];

        for (const event of json.items || []) {
          const sport = (event.sport || "").trim().toLowerCase();
          if (sport !== "football") continue;

          const pub = (event.publishers || []).find(
            (p) => (p.state_association_acronym || "").trim().toUpperCase() === "CIFCCS"
          );
          if (!pub) continue;

          for (const b of pub.broadcasts || []) {
            const pageUrl = typeof b.view_url === "string" ? b.view_url.trim() : "";
            if (!pageUrl) continue;

            const startTime =
              (typeof b.start_time === "string" && b.start_time) ||
              (typeof event.start_time === "string" && event.start_time) ||
              "";
            if (!startTime) continue;

            out.push({
              id: b.key || `${event.key || "event"}-${startTime}`,
              gameKey: b.game_key || event.key,
              title:
                (typeof b.subheadline === "string" && b.subheadline.trim()) ||
                (typeof event.title === "string" && event.title.trim()) ||
                "NFHS Broadcast",
              startTime,
              status: deriveStatus(b),
              pageUrl: toHttps(pageUrl),
              paymentRequired: parseBool(b.payment_required ?? event.payment_required),
              publisherName: pub.headline_short_name || pub.formatted_name,
              publisherSlug: pub.slug,
            });
          }
        }

        // Dedupe by URL (same event can appear via multiple publishers)
        const deduped = Array.from(new Map(out.map((b) => [b.pageUrl, b])).values());

        deduped.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

        if (!isMounted) return;
        setBroadcasts(deduped);
        setLastUpdated(new Date());
      } catch (e) {
        if (!isMounted) return;
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void load();

    const t = setInterval(() => {
      void load();
    }, refreshMs);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(t);
    };
  }, [refreshMs, url]);

  return { broadcasts, loading, error, lastUpdated };
}
