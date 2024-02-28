// route handler enabling draft mode
import { draftMode } from 'next/headers'

export async function GET(req: Request) {
  const path = req.url;
     draftMode().enable()
  
  return   new Response(path)
}