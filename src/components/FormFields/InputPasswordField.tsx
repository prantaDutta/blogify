import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import React, { ReactNode } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

interface InputPasswordFieldProps extends InputProps {
  children?: ReactNode
  label: string
  error?: string
  field: ControllerRenderProps<FieldValues, any>
}

const InputPasswordField: NextPage<InputPasswordFieldProps> = ({
  label,
  error,
  field,
  ...props
}) => {
  const color = error ? 'red.500' : 'purple.500'
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          // focusBorderColor={color}
          borderColor={color}
          fontWeight="semibold"
          fontSize="md"
          type={show ? 'text' : 'password'}
          {...field}
          {...props}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText
        textTransform="capitalize"
        fontWeight="semibold"
        color="red.500"
        fontStyle="italic"
      >
        {error}
      </FormHelperText>
    </FormControl>
  )
}

export default InputPasswordField