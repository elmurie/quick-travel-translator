import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const languages = [
    {
      label: "Italian",
      value: "italian",
    },
    {
      label: "French",
      value: "french",
    },
    {
      label: "German",
      value: "german",
    },
    {
      label: "Spanish",
      value: "spanish",
    },
    {
      label: "Dutch",
      value: "dutch",
    },
    {
      label: "Japanese",
      value: "japanese",
    },
  ]
  const [translationTextInput, setTranslationTextInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ translationText: translationTextInput, language: languageInput }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/world.png" />
      </Head>

      <main className={styles.main}>
        <img src="/world.png" className={styles.icon} />
        <h3>Quick Travel Translator</h3>
        <h6>A little AI help for our English-speaking friends out there</h6>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="translation"
            placeholder="Insert your text"
            value={translationTextInput}
            onChange={(e) => setTranslationTextInput(e.target.value)}
          />
          <select
            name="language"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
          >
            {languages.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
          <input type="submit" value="Translate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
