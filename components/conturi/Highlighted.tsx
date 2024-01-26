import { NormalizeUnicodeString } from "@/lib/normalize";

interface HighlightedProps {
    text: string;
    highlight: string;
}

export default function Highlighted({ text, highlight }: HighlightedProps) {
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = NormalizeUnicodeString(text).split(regex)
    return (
      <span>
         {parts.filter(part => part).map((part, i) => (
             regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
         ))}
     </span>
    )
 }