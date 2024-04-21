import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Qikelink.com || YC office Hour for every founder",
  description = "Qikelink is a startup advisory platform Connecting You To great founders for mentorship.",
  image = "/opengraph-image.jpg",
  icons = "https://bafkreif7fy6ndk7v7zqpmcbsngr5fnohjgvdpappfr7r3c33h6ie7oda7a.ipfs.nftstorage.link/",
  noIndex = false
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@winnerAzubuike & @WisdomN69527"
    },
    icons,
    metadataBase: new URL('https://qikelink.com/'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}
