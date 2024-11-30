
interface Props{
  data:object;
  url:string
}

export default async function SendData({url,data}:Props) {


  const reqConfig:RequestInit={
    method:"POST",
    body:JSON.stringify(data)
  }

  const response=await fetch(url,reqConfig)


}