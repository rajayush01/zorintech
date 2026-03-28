import Masonry from '@/components/ui/Masonry'
import React from 'react'
import clg from '@/assets/students-inclass.jpg'
import school from '@/assets/school-img.jpg'
import science from '@/assets/science-lab.jpg'
import sports from '@/assets/sports-img.jpg'

const Gallery = () => {
	const galleryItems: { img: string; title: string }[] = [
	{ img: clg, title: 'Mountain View' },
	{ img: school, title: 'Forest' },
	{ img: science, title: 'River' },
	{ img: sports, title: 'Desert' },
];


  return (
	<div className='mt-10'>
	  <Masonry  items={galleryItems}/>
	</div>
  )
}

export default Gallery
