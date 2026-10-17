import { useState } from "react";
import type { FormEvent, RefObject } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@/components/Icon";
import { creator } from "@/data/portfolio";
import { Sticker } from "@/components/Scrapbook";

export function Contact({
  open,
  onOpenChange,
  returnFocusRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("");

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) {
      setStatus("Please add your name and a few words about the project.");
      return;
    }
    setBrief(
      `Inquiry for ${creator.name}\n\nFrom: ${name}\nEmail: ${String(data.get("email") ?? "").trim()}\nProject: ${String(data.get("type") ?? "")}\n\n${message}\n\nPrepared with ${creator.firstName}'s portfolio brief builder. This brief has not been sent.`,
    );
    setStatus(
      "Your brief is ready. Download or copy it below. No message has been sent.",
    );
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "inquiry-for-marella-almazar.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      `Your brief download is ready. Keep it until ${creator.firstName}'s contact details are available.`,
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("Brief copied. No message has been sent.");
    } catch {
      setStatus(
        "Clipboard access is unavailable. Download the brief or select the text to copy it manually.",
      );
    }
  }
  return (
    <section
      id="contact"
      className="contact section-shell"
      aria-labelledby="contact-title"
    >
      <div className="contact-text reveal">
        <span className="letter-salutation" aria-hidden="true">
          Dear {creator.firstName},
        </span>
        <p className="editorial-label">Leave a little note</p>
        <h2 id="contact-title">
          Something
          <br />
          <em>in mind?</em>
        </h2>
        <p>
          A thought, an idea, a story waiting to happen.
          <br />
          Give it a place to start.
        </p>
      </div>
      <div className="contact-action">
        <Sticker name="rose-seal" className="contact-seal" />
        <span className="handwritten">let’s put it on paper</span>
        <Dialog
          open={open}
          onOpenChange={(value) => {
            onOpenChange(value);
            if (!value) {
              setBrief("");
              setStatus("");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="contact-button"
              onClick={(event) => {
                returnFocusRef.current = event.currentTarget;
              }}
            >
              Write a project brief <Icon name="arrow" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="brief-dialog"
            onCloseAutoFocus={(event) => {
              if (returnFocusRef.current?.isConnected) {
                event.preventDefault();
                returnFocusRef.current.focus();
              }
            }}
          >
            <DialogTitle className="font-display text-4xl">
              A little note for {creator.firstName}.
            </DialogTitle>
            <DialogDescription>
              {creator.email
                ? "Prepare a brief to send from your own email app."
                : "Contact email is awaiting confirmation. This tool prepares a local brief; it does not send or store your details."}
            </DialogDescription>
            <form onSubmit={prepare} className="brief-form">
              <div className="form-pair">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Your email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label>
                What brings you here?
                <select name="type">
                  <option>A creative project</option>
                  <option>A collaboration idea</option>
                  <option>A general hello</option>
                </select>
              </label>
              <label>
                A few words about your idea
                <textarea
                  name="message"
                  rows={4}
                  required
                  maxLength={3000}
                  placeholder={`Tell ${creator.firstName} what you have in mind…`}
                />
              </label>
              <Button type="submit">Prepare my brief</Button>
            </form>
            <p role="status" className="form-status">
              {status}
            </p>
            {brief && (
              <div className="prepared-brief">
                <label htmlFor="brief-preview">Your prepared brief</label>
                <textarea id="brief-preview" readOnly value={brief} rows={6} />
                <div className="brief-actions">
                  <Button onClick={download}>
                    <Icon name="download" />
                    Download brief
                  </Button>
                  <Button variant="outline" onClick={copy}>
                    <Icon name="copy" />
                    Copy text
                  </Button>
                  {creator.email && (
                    <a
                      className="email-action"
                      href={`mailto:${creator.email}?subject=${encodeURIComponent(`A project idea for ${creator.firstName}`)}&body=${encodeURIComponent(brief)}`}
                    >
                      Open email app
                    </a>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <p className="contact-disclosure">
          Prepare an inquiry, download it, make it yours.
          <br />
          Contact details coming from {creator.firstName}.
        </p>
      </div>
      <Sticker name="ribbon" className="contact-ribbon" />
    </section>
  );
}
