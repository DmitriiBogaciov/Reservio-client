//Home Page

'use client'
import axios from "axios"
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_BABOOX_API;


export default function WorkAreaDetail(params:any) {
  console.log(params)

  return (
    <div>
        <h1>Detail: {params.params.id}</h1>

    </div>
  )
}
