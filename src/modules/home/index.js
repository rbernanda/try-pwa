import React from 'react'
import { Link } from 'react-router-dom'

import { GAMES } from './constant'

import { Tag } from 'components/Tag'

const Card = ({ title, description, link, image, tags }) => {
  return (
    <Link to={link} className="w-full">
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src={image} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {tags.map((label, index) => (
            <Tag key={index} label={label} />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <ul className="grid grid-cols-3 gap-12 p-8">
      {GAMES.map(({ tags, description, title, link, image }, index) => (
        <li>
          <Card
            description={description}
            image={image}
            key={index}
            link={link}
            tags={tags}
            title={title}
          />
        </li>
      ))}
    </ul>
  )
}
