import { dir } from "i18next"
import { languages } from "@/app/i18n/settings"
import SelectLangButton from "@/components/select-lang-button"

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: {
    lng: string
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        style={{
          background: "linear-gradient(45deg, #6EDA78, #FFA200)",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <SelectLangButton currentLang={lng} />
        {children}
      </body>
    </html>
  )
}
