import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "./Icon";
import { creator } from "@/data/portfolio";

const links = [
  { href: "#videos", label: "Videos" },
  { href: "#results", label: "Results" },
  { href: "#about", label: `About ${creator.firstName}` },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${creator.name}, home`}>
        {creator.name.toLowerCase()}
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="mobile-menu">
            Menu <Icon name="menu" />
          </Button>
        </DialogTrigger>
        <DialogContent className="mobile-nav-dialog">
          <DialogTitle className="font-display text-4xl">
            Make yourself at home.
          </DialogTitle>
          <DialogDescription>
            Meet {creator.firstName}, explore her videos, and see her
            Instagram results.
          </DialogDescription>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}
