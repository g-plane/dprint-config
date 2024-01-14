import * as path from 'https://deno.land/std@0.212.0/path/mod.ts'
import yargs from 'https://deno.land/x/yargs@v17.7.2-deno/deno.ts'

const filePath = path.join(Deno.cwd(), 'dprint.json')
const baseURL = 'https://dprint.gplane.win'

yargs(Deno.args)
  .command({
    command: 'init',
    aliases: ['create'],
    description: 'create dprint config',
    handler: init,
  })
  .command({
    command: 'update',
    aliases: ['up'],
    description: 'update to latest config',
    handler: update,
  })
  .strictCommands()
  .demandCommand(1)
  .scriptName('cli.ts')
  .help()
  .version(false)
  .parse()

async function init() {
  const latest = await fetchLatest()
  if (!latest) {
    return
  }

  const config = { extends: `${baseURL}/${latest.name}.json` }
  await Deno.writeTextFile(filePath, JSON.stringify(config, null, 2) + '\n')
}

async function update() {
  const config: { extends?: string | string[] } = JSON.parse(
    await Deno.readTextFile(filePath),
  )

  const latest = await fetchLatest()
  if (!latest) {
    return
  }

  if (Array.isArray(config.extends)) {
    const index = config.extends.findIndex((url) => url.startsWith(baseURL))
    if (~index) {
      config.extends[index] = `${baseURL}/${latest.name}.json`
    }
  } else {
    config.extends = `${baseURL}/${latest.name}.json`
  }

  await Deno.writeTextFile(filePath, JSON.stringify(config, null, 2) + '\n')
}

async function fetchLatest() {
  const response = await fetch(
    'https://api.github.com/repos/g-plane/dprint-config/tags',
  )
  const [latest]: Array<{ name: string }> = await response.json()
  return latest
}
