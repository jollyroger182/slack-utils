import { App } from 'slack.ts'

const { BOT_TOKEN, SIGNING_SECRET, COMMAND_PREFIX = '', PORT = '8000' } = process.env
if (!BOT_TOKEN || !SIGNING_SECRET) {
	throw new Error('BOT_TOKEN or SIGNING_SECRET environment variable not set')
}

const app = new App({
	token: BOT_TOKEN,
	receiver: { type: 'http', port: Number(PORT), signingSecret: SIGNING_SECRET },
})

app.on(`/${COMMAND_PREFIX}id`, async (event) => {
	const text = (event.text.trim() || event.user_id).replace(
		/^\s*<(?:\!subteam\^|@|#)([0-9A-Z]+)(?:\|.*)?>\s*$/,
		(_, x) => x,
	)
	await event.respond.message({ ephemeral: true, text })
})

await app.start()
