import { collectM3uSource } from "../utils"
import { handle_m3u, ISource, type TSources } from "./utils"

export const yb0121_jx_iptv_filter: ISource["filter"] = (
    raw,
    caller,
    collectFn
): [string, number] => {
    const rawArray = handle_m3u(raw)

    let result = rawArray.filter((r) => !/^#\s+/.test(r))

    if (caller === "normal" && collectFn) {
        for (let i = 1; i < result.length; i += 2) {
            collectM3uSource(result[i], result[i + 1], collectFn)
        }
    }

    return [result.join("\n"), (result.length - 1) / 2]
}

export const yb0121_jx_iptv_sources: TSources = [
    {
        name: "yb0121/Jiangxi-IPTV IPTV Unicom",
        f_name: "y_jx_iptv_telecom",
        url: "https://raw.githubusercontent.com/yb0121/jxIPTV/main/jxdxIPTV.m3u",
        filter: yb0121_jx_iptv_filter,
    },
]
