import { NextPageContext } from 'next'
import withSession from '../lib/session'

function _withAuth(handler: any) {
  return async (context: NextPageContext) => {
    const { req } = context
    const user = (req as any).session.get('user')
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      }
    }

    const newCtx = {
      ...context,
      user,
    }

    return handler(newCtx)
  }
}

export default function withAuth(handler: any) {
  return withSession(_withAuth(handler))
}
