"use client"

import { useState } from "react"
import { Plus, Laptop, Smartphone } from "lucide-react"

export default function Portfolio() {
  const [filter, setFilter] = useState("*")

  const portfolioItems = [
    { id: 1, category: "design", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, category: "development", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, category: "design", image: "/placeholder.svg?height=300&width=400" },
    { id: 4, category: "development", image: "/placeholder.svg?height=300&width=400" },
  ]

  const filteredItems = filter === "*" ? portfolioItems : portfolioItems.filter((item) => item.category === filter)

  return (
    <section className="py-5 border-b border-gray-700">
      <h1 className="relative pb-3 mb-5 text-3xl font-bold text-[#f2f2f2] before:absolute before:content-[''] before:w-[10px] before:h-[10px] before:bottom-[-4px] before:left-0 before:border-2 before:border-[#f2f2f2] before:rounded-[10px] after:absolute after:content-[''] after:w-[50px] after:h-[2px] after:bottom-0 after:left-[15px] after:rounded-[2px] after:bg-[#f2f2f2]">
        Portfolio
      </h1>
      <div className="mb-8">
        <div className="text-center mb-4">
          <ul className="inline-flex flex-wrap gap-2 mb-4">
            <li
              className={`${filter === "*" ? "bg-[#00b87b]" : "bg-[#314355]"} text-[#f2f2f2] px-4 py-2 cursor-pointer`}
              onClick={() => setFilter("*")}
            >
              <span className="me-2">★</span>All
            </li>
            <li
              className={`${filter === "design" ? "bg-[#00b87b]" : "bg-[#314355]"} text-[#f2f2f2] px-4 py-2 cursor-pointer`}
              onClick={() => setFilter("design")}
            >
              <span className="me-2">
                <Laptop className="inline-block w-4 h-4" />
              </span>
              Design
            </li>
            <li
              className={`${filter === "development" ? "bg-[#00b87b]" : "bg-[#314355]"} text-[#f2f2f2] px-4 py-2 cursor-pointer`}
              onClick={() => setFilter("development")}
            >
              <span className="me-2">
                <Smartphone className="inline-block w-4 h-4" />
              </span>
              Development
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="mb-4 relative group">
              <div className="relative overflow-hidden mb-2">
                <img
                  className="w-full h-auto"
                  src={item.image || "/placeholder.svg"}
                  alt={`Portfolio ${item.id}`}
                  width={400}
                  height={300}
                />
                <div className="absolute w-0 h-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(44,62,80,0.9)] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:w-[calc(100%-60px)] group-hover:h-[calc(100%-60px)] group-hover:top-1/2 group-hover:left-1/2 flex items-center justify-center">
                  <a href={item.image} className="text-[#f2f2f2]">
                    <Plus className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
