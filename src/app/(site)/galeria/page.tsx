import Gallery from "@/components/gallery";
import getPhotos from "@/services/get-photos.service";

export default async function GalleryPage() {
    const photos = await getPhotos(1);

    // const ps = photos?.docs ? [...photos.docs, ...photos.docs, ...photos.docs, ...photos.docs, ...photos.docs] : [];
    const ps = photos?.docs ?? [];

    return (
        <div>
            <Gallery
                photos={ps}/>
        </div>
    )
}