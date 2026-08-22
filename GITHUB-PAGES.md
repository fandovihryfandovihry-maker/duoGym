# Publikování DuoGym zdarma přes GitHub Pages

Projekt už obsahuje automatický GitHub Pages workflow. Po každém nahrání změn se aplikace sama sestaví a publikuje.

## První publikování

1. Na GitHubu vytvořte nový **veřejný** repozitář, například `duogym`.
2. Nahrajte do něj celý obsah této složky. Nejsnazší je GitHub Desktop: `File → Add local repository`, vyberte složku projektu a zvolte `Publish repository`.
3. Na stránce repozitáře otevřete `Settings → Pages`.
4. U `Build and deployment → Source` vyberte `GitHub Actions`.
5. Otevřete záložku `Actions` a počkejte, až workflow `Publish DuoGym to GitHub Pages` zezelená.
6. Aplikace bude na adrese `https://VAŠE-JMÉNO.github.io/duogym/`.

Pokud repozitář pojmenujete `VAŠE-JMÉNO.github.io`, adresa bude jen `https://VAŠE-JMÉNO.github.io/`.

## Android tablet

Do aplikace **Fully Kiosk Browser & Lockdown** vložte výslednou GitHub Pages adresu jako `Start URL`. GitHub Pages používá HTTPS, takže přidání na plochu, service worker i offline režim fungují správně.

## Soukromí

Zdrojový repozitář a webová aplikace budou při bezplatném GitHub Pages veřejné. Tréninkové váhy a historie se na GitHub neposílají – zůstávají pouze v `localStorage` konkrétního tabletu.
