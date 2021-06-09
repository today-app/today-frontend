import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'
import config from 'utils/config'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(404)
  if (
    !config.oauthClientId ||
    !config.oauthClientSecret ||
    !config.oauthRedirectUrl ||
    !config.oauthTokenEndpoint
  )
    return res.status(401)

  const { code, grantType } = req.body
  const basicHeader = Buffer.from(`${config.oauthClientId}:${config.oauthClientSecret}`).toString(
    'base64',
  )
  const headers = {
    authorization: `Basic ${basicHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  let params
  if (grantType === 'authorization_code') {
    params = qs.stringify({
      grant_type: grantType,
      code,
      redirect_uri: config.oauthRedirectUrl,
    })
  } else {
    params = qs.stringify({
      token: req.body.refreshToken,
    })
  }

  const resp = await axios.post(config.oauthTokenEndpoint, params, {
    headers,
  })

  res.status(resp.status).json(resp.data)
}
