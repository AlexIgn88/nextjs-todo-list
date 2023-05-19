import Head from 'next/head';
import ToDo from '../components/ToDo.js';

export default function MainPage() {
  return <>
    <Head>
      <title>To-Do list</title>
    </Head>
    <ToDo />
  </>
}