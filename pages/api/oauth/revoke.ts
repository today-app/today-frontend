import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'
import config from 'utils/config'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(404)
  if (
    config.oauthClientId === null ||
    config.oauthClientSecret === null ||
    config.oauthTokenRevocationEndpoint === null
  )
    return res.status(401)

  const { token_type_hint, token } = req.body
  const basicHeader = Buffer.from(`${config.oauthClientId}:${config.oauthClientSecret}`).toString(
    'base64',
  )
  const headers = {
    authorization: `Basic ${basicHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const params = qs.stringify({
    token_type_hint,
    token,
  })

  const resp = await axios.post(config.oauthTokenRevocationEndpoint, params, {
    headers,
  })

  res.status(resp.status).json(resp.data)
}
