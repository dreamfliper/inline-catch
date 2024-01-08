import data from './inlineData.json'
import { telegrambot } from './telegramBot'
import { map, find, includes, values, tap, pipe, flatten, prop } from 'ramda'

const getMyData = data => map(([k, v]) => ({ [k]: v.times }), Object.entries(data))

const findFirstAvable = find(dataObj => find(pipe(values, flatten, includes(2)))(values(dataObj)))

const formatToDB = obj => Object.entries(obj).map(([k,v]) => 
	Object.entries(v).map(([kk, v]) => ({[k+kk]: v}))
).flat().find(pipe(values, flatten, includes(2)))

let latestTime = '99999999999999999999999'

const getCalendar = () => fetch(
	'https://inline.app/api/booking-capacitiesV3?companyId=-MX1nN8JkPT2UDVCd9Ue%3Ainline-live-2&branchId=-MX1nNJUL2ocuIoBvg3o',
	{
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9',
			'if-none-match': 'W/"7278-fZvrBC0K2XNtQFGVhDPgo6Iw2CI"',
			'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"macOS"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin',
			'x-client-fingerprint': '6220ed882235ca046e85443010e80547',
			'x-client-session-id': '26ed5137-ebda-49da-8abe-a24ba9e3145c',
		},
		referrer:
			'https://inline.app/booking/-MX1nN8JkPT2UDVCd9Ue:inline-live-2/-MX1nNJUL2ocuIoBvg3o?language=zh-tw',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
	}
)
	.then(x => x.json())
	.then(prop('default'))
	.then(getMyData)
	.then(findFirstAvable)
	.then(formatToDB)
	.then(obj => {
		if(Object.keys(obj)[0] < latestTime) {
			latestTime = Object.keys(obj)[0]
			telegrambot(latestTime)
		}
	})

setInterval(getCalendar, 3000)
