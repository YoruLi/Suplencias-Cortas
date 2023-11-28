import Image from "next/image";
import pomPom from "../../public/imgs/pom-pom-astral-express.gif";
export default function Home() {
    return (
        <div className="grid place-content-center h-full lg:min-h-[calc(100dvh-56px)] min-h-[calc(100dvh-56px-56px)] mx-auto ">
            <Image alt="Pom pom " className="mx-auto" src={pomPom.src} height={pomPom.height} width={pomPom.width} blurDataURL={pomPom.blurDataURL} />

            <legend className="opacity-60 text-center">Debes iniciar sesion para continuar...</legend>
        </div>
    );
}
