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
    <html
      lang={lng}
      dir={dir(lng)}
      style={{
        height: "100%",
        background: "-webkit-linear-gradient(45deg, #6EDA78 , #FFA200)",
      }}
    >
      <body>
        <SelectLangButton currentLang={lng} />
        {children}
      </body>
    </html>
  )
}
