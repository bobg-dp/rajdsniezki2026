# Rajd Śnieżki

Strona i API to jeden Worker Cloudflare. Pliki z `dist/` idą jako assety, a skrypt obsługuje tylko `/api/*`. Licznik odwiedzin trzyma baza D1.

## Baza D1 przy pierwszym deployu

W `wrangler.jsonc` pole `database_id` startuje jako same zera:

`00000000-0000-0000-0000-000000000000`

To nie jest baza. Lokalny `wrangler dev --local` na tym id działa, więc błąd wychodzi dopiero przy deployu na Cloudflare:

`D1 binding 'DB' references database '00000000-…' which was not found` (kod 10181).

W panelu bazy nic się nie ustawia. Bazę trzeba utworzyć i wpisać jej id do konfiguracji, zanim build w ogóle wystartuje:

```sh
npx wrangler login
npx wrangler d1 create rajdsniezki
```

Skopiuj wypisane `database_id` do `wrangler.jsonc` w miejsce zer. Ta zmiana musi być w commicie, z którego Cloudflare buduje Workera. Samo utworzenie bazy w panelu nie podmienia id w repozytorium.

Potem utwórz tabelę licznika na zdalnej bazie i dopiero wtedy odpal deploy:

```sh
npx wrangler d1 migrations apply rajdsniezki --remote
```

Migracja leży w `worker/migrations/`. Bez niej deploy przejdzie, ale licznik odwiedzin odpowie, że tabela nie jest zainicjowana.
