import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Qikelink.com || One-stop-shop Consulting platform",
  description = "Qikelink is a platform for individuals seeking guidance and experienced content creators and industry leaders",
  image = "/image.png",
  icons = "https://bafkreif7fy6ndk7v7zqpmcbsngr5fnohjgvdpappfr7r3c33h6ie7oda7a.ipfs.nftstorage.link/",
  alternates = {
    canonical: "https://qikelink.com/",
  },
  noIndex = false,
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    alternates,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@winnerAzubuike & @WisdomN69527",
    },
    icons,
    metadataBase: new URL("https://qikelink.com/"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
