import { NextApiRequest, NextApiResponse } from 'next'

import config from '../../utils/config'

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(config)
}
