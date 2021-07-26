import { Box, Heading, Text } from '@chakra-ui/react'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Layout from '../components/Layout'
import { authAtom } from '../state/authState'
import { API_URL, FEATURES, IS_PRODUCTION } from '../util/constants'
import { ModifiedUser } from '../util/types'

interface indexProps {
  user: ModifiedUser | null
}

const index: React.FC<indexProps> = ({ user }) => {
  const auth = useRecoilValue(authAtom)
  return (
    <Layout user={user}>
      <Box marginY="4">
        {auth ? (
          <Text as="span" color="purple.700" cursor="pointer">
            You can now see all the posts
          </Text>
        ) : (
          <Heading as="h4" fontSize="lg">
            Please{' '}
            <Link href="/login">
              <Text as="span" color="purple.700" cursor="pointer">
                Log In
              </Text>
            </Link>{' '}
            to view Posts
          </Heading>
        )}
      </Box>
      <Text fontWeight="semibold" fontSize="xl">
        Project Features
      </Text>

      {FEATURES.map((feature) => (
        <Box key={feature} my="2">
          <Text fontWeight="semibold" color="purple.500">
            ✅ {feature}
          </Text>
        </Box>
      ))}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    let { data: user } = await axios.get(API_URL + '/user')
    if (!isEmpty(user)) {
      return { props: { user } }
    }
  } catch (e) {
    if (IS_PRODUCTION) {
      console.log('user not authenticated', e.message)
    }
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}

export default index
