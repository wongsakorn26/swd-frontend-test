"use client";

import { useEffect, useState } from "react";
import i18next, { FlatNamespace, KeyPrefix } from "i18next";
import {
    initReactI18next,
    useTranslation as useTranslationOrg,
    UseTranslationOptions,
    UseTranslationResponse,
    FallbackNs,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`./locales/${language}/${namespace}.json`)
        )
    )
    .init({
        ...getOptions(),
        lng: undefined, // detect language on client side
        detection: {
            order: ["path", "htmlTag", "cookie", "navigator"],
        },
        preload: runsOnServerSide ? languages : [],
    });

export function useTranslation<
    Ns extends FlatNamespace,
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
    lng: string,
    ns?: Ns,
    options?: UseTranslationOptions<KPrefix>
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
    const ret = useTranslationOrg(ns, options);
    const { i18n } = ret;

    // This hook will always run, but only do something on the client
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

    useEffect(() => {
        if (activeLng !== i18n.resolvedLanguage) {
            setActiveLng(i18n.resolvedLanguage);
        }
    }, [activeLng, i18n.resolvedLanguage]);

    useEffect(() => {
        if (!runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
            i18n.changeLanguage(lng);
        }
    }, [lng, i18n]);

    // Server-side synchronous language change
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng);
    }

    return ret;
}
