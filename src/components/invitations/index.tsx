import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";

function Invitations() {

	const router = useRouter();
	const {query: {id = '', slug}} = router;
  return (
    <div className="container grid md:grid-cols-4 gap-4">
      <Link href={`/me/message/${slug}/invitation`} className="font-bold border border-app-blue flex flex-col items-center justify-center h-32 text-app-blue rounded-lg">
        <span>Créer une invitation</span>    
        <AiOutlinePlusCircle className="text-6xl mt-1"/>
      </Link>
    </div>
  )
}

export default Invitations
