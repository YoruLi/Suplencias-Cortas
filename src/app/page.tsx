import Image from "next/image";
import pomPom from "../../public/imgs/logo.jpeg";
export default function Home() {
    return (
        <div className="grid place-items-center min-h-full mx-auto ">
            <Image alt="Pom pom " className="mx-auto" src={pomPom.src} height={pomPom.height} width={pomPom.width} blurDataURL={pomPom.blurDataURL} />

            <legend className="text-center animate-pulse text-main ">Debes iniciar sesion para continuar...</legend>
        </div>
    );
}
