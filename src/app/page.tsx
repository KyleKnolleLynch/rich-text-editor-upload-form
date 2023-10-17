'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import Tiptap from '@/components/Tiptap'

export default function Home() {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters long' }),
    price: z.number(),
    description: z
      .string()
      .min(5, { message: 'Description must be longer' })
      .max(100, { message: 'Description is too long' })
      .trim(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      price: 29.99,
      description: '',
    },
  })

  function onFormSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <main className='p-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Main title for your product' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className='my-4' type='submit'>Submit</Button>
        </form>
      </Form>
    </main>
  )
}
