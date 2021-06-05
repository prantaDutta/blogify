import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react'
import axios from 'axios'
import { NextPageContext } from 'next'
import { withIronSession } from 'next-iron-session'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Layout from '../components/Layout'
import PrimaryButton from '../components/PrimaryButton'
import { cookieOptions } from '../handler'
import { authAtom } from '../state/authState'
import { ModifiedUser } from '../util/types'

interface registerProps {
  user: ModifiedUser
}

type RegisterForm = {
  name: string
  email: string
  password: string
}

const register: React.FC<registerProps> = ({ user }) => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const setAuth = useSetRecoilState(authAtom)
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
    try {
      const { data } = await axios.post('/api/register', form)
      setAuth(data.user)
      setError(null)
      return router.push('/')
    } catch (e) {
      setError(e.response.data.error)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <Layout user={user}>
      <Heading as="h4" fontSize="xl" fontWeight="bold">
        Login to your Account
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl my="5" id="name">
          <FormLabel>Full Name</FormLabel>
          <Input
            onChange={handleChange}
            type="text"
            placeholder="Enter Your Name"
            fontWeight="semibold"
            fontSize="md"
            name="name"
          />
          <FormHelperText
            fontWeight="semibold"
            color="red.500"
            fontStyle="italic"
          >
            {error}
          </FormHelperText>
        </FormControl>

        <FormControl my="5" id="email">
          <FormLabel>Email Address</FormLabel>
          <Input
            onChange={handleChange}
            type="email"
            placeholder="Enter Your Email"
            fontWeight="semibold"
            fontSize="md"
            name="email"
          />
        </FormControl>

        <FormControl my="5" id="password">
          <FormLabel>Enter Password</FormLabel>
          <InputGroup size="md">
            <Input
              onChange={handleChange}
              placeholder="Enter Your Password"
              type={show ? 'text' : 'password'}
              fontWeight="semibold"
              fontSize="md"
              name="password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Flex>
          <PrimaryButton my="5" type="submit">
            Register
          </PrimaryButton>
          <Spacer />
          <PrimaryButton my="5" type="button">
            <Link href="/login">Login Instead</Link>
          </PrimaryButton>
        </Flex>
      </form>
    </Layout>
  )
}

export const getServerSideProps = withIronSession(
  async ({ req }: NextPageContext) => {
    const user = (req as any).session.get('user')
    if (!user) {
      return { props: {} }
    }
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    }
  },
  cookieOptions
)

export default register