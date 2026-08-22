# DuoGym na Android tabletu

## Android 4.4.2

Současný Fully Kiosk už Android 4.4 nepodporuje. Pro tento tablet použij
**Kiosk Browser 2.9.3 (build 360)** z oficiálního archivu výrobce. APK stáhni
na počítači, přenes přes USB a na tabletu před instalací povol
`Nastavení > Zabezpečení > Neznámé zdroje`.

Start URL:

`https://fandovihryfandovihry-maker.github.io/duoGym/`

DuoGym Android 4.4 rozpozná a automaticky otevře kompatibilní variantu na
`/duoGym/legacy/`. Ta nepoužívá Service Worker ani moderní JavaScript, ale
zachovává tréninky, historii vah, střídání stanovišť a 30s odpočinek.

## Doporučená varianta s GitHub Pages

Po publikování podle `GITHUB-PAGES.md` vložte veřejnou HTTPS adresu jako `Start URL` do aplikace **Fully Kiosk Browser & Lockdown**. Počítač potom nemusí být zapnutý a není potřeba žádné přihlašování do DuoGym.

## Lokální varianta bez hostingu

`localhost` na tabletu znamená samotný tablet, ne počítač. Počítač proto musí běžet ve stejné Wi-Fi a tablet otevírá jeho lokální adresu, například `http://192.168.1.50:3000`.

V routeru nastavte počítači rezervovanou IP adresu. Kdyby se IP změnila, prohlížeč ji považuje za jinou aplikaci a lokální historie by se na nové adrese nezobrazila.

## Spuštění serveru

1. Na počítači spusťte `START-DUOGYM.cmd` a okno nezavírejte.
2. Adresu počítače zjistíte příkazem `ipconfig` – použijte IPv4 adresu aktivní Wi-Fi nebo Ethernetu.
3. Pokud Windows zobrazí dotaz brány firewall, povolte přístup pouze v soukromých sítích.
4. Na tabletu otevřete `http://IP-POČÍTAČE:3000`.

## Doporučený kiosk režim

Pro nástěnný tablet je nejpraktičtější aplikace **Fully Kiosk Browser & Lockdown**:

1. Nainstalujte Fully Kiosk Browser z Google Play.
2. Do `Start URL` vložte lokální adresu DuoGym.
3. Zapněte `Fullscreen Mode`, `Launch on Boot`, `Keep Screen On` a `Kiosk Mode`.
4. Pokud je dostupné, zapněte `Skip Lock Screen`.
5. V Androidu vypněte pro Fully Kiosk optimalizaci baterie, jinak ho systém může po čase ukončit.
6. Nastavte orientaci tabletu na šířku.

## Varianta zdarma bez speciálního prohlížeče

V Androidu zapněte `Nastavení → Zabezpečení → Připnutí aplikace`. Otevřete DuoGym v Chrome, přejděte do přehledu spuštěných aplikací, klepněte na ikonu Chrome a zvolte `Připnout`. Tato varianta aplikaci uzamkne na obrazovce, ale po restartu ji obvykle musíte otevřít a připnout ručně.

## Automatický start počítače

Zástupce souboru `START-DUOGYM.cmd` lze vložit do složky otevřené přes `Win + R → shell:startup`. Server se pak spustí po přihlášení do Windows.
