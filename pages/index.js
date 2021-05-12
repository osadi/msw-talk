import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useTranslation, Trans } from "next-i18next";
import Link from "next/link";

export default function Home() {
  const { t } = useTranslation("common");
  const clickMe = () => alert("clicked");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{t("first.second")}</h1>

        <hr style={{ width: "100%" }} />

        <Trans
          ns="tt"
          defaults="Should not see me??? <showLogin>login</showLogin>"
          i18nKey="alreadyHasAnAccount"
          components={{
            showLogin: <OpenLoginBox cb={clickMe} />,
          }}
        />

        <hr style={{ width: "100%" }} />

        {/*<Trans i18nKey="positionk">
          Whatever man hoho <Linkkkkk href="www.apa.bepa">STRONG</Linkkkkk>
          <i>wawawwa</i>
        </Trans>
        */}

        <hr style={{ width: "100%" }} />

        <Trans
          ns="common"
          i18nKey="contactCustomerService"
          values={{
            customerServicePhone: "112233",
            customerServiceLink: t("linkToCustomerService"),
          }}
          components={{
            ...defaultComponents,
          }}
        />
      </main>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["purchase", "common"])),
  },
});

const OpenLoginBox = ({ cb, children }) => {
  return (
    <button style={{ display: "inline-block" }} onClick={() => cb()}>
      {children ?? "default"}
    </button>
  );
};

const A = ({ href, text, target, children }) => {
  const theText = text ? text : children[0];

  return target === "_blank" ? (
    <a href={href} target="_blank">
      {theText}
    </a>
  ) : (
    <Link href={href}>{theText}</Link>
  );
};

const defaultComponents = {
  a: <A />,
  h1: <h1 />,
  paragraph: <p style={{ color: "#000" }} />,
};

/*
Lite use-cases från react_frontend.

Logga in sk öppna en loginruta. Hur kan vi förstå vilken text som ska trigga loginrutan? och vilken som ska vara en vanlig länk 
1.Har du redan ett konto? <a>Logga in</a>
2.Har du redan ett konto? <a>Tryck här</a> för att öppna loginrutan eller klicka <a href="/logga-in">här</a>. 

Kan vi ha egna taggar/element?
2.Har du redan ett konto? <show-login>Tryck här</show-login> för att öppna loginrutan eller klicka <a href="/logga-in">här</a>. 

A-taggarna ska bli till en nextjs Link:
Prenumerationen ingår redan i din produkt. Kontakta <a href="/kundservice">kundservice</a> eller ring på <a>0311234567</a>

<a href='http://info.gp.se/goteborgs-postens-etiska-regler/' target='_blank'>här</a>
*/
