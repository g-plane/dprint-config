# dprint-config

Shareable [dprint](https://dprint.dev/) configuration file for Pig Fang's projects.

## Usage

### With CLI

If you have installed Deno, you can use the CLI to create or update the config.

To create config:

```
deno run --allow-read --allow-write --allow-net https://dprint.gplane.win/cli.ts init
```

`create` command is an alias for `init`.

To update config:

```
deno run --allow-read --allow-write --allow-net https://dprint.gplane.win/cli.ts update
```

`up` command is an alias for `update`.

### Manually

Edit `dprint.json` like this:

```json
{
  "extends": "https://dprint.gplane.win/<version>.json"
}
```

Replace the `<version>` above with actual latest version manually.

## License

MIT License (c) 2023-present Pig Fang
