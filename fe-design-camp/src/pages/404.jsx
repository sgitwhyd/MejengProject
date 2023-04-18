export default function Custom404() {
  return (
    <div className="flex h-[58vh] flex-col items-center justify-center text-center ">
      <h1 className="text-[200px] font-bold">Oops!</h1>
      <h2 className="pb-5 pt-2 text-2xl font-semibold">404 - PAGE NOT FOUND</h2>
      <p className="w-1/2 text-xl">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable
      </p>
    </div>
  );
}
