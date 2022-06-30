import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {currentBlogsList: [], isLoading: true}

  componentDidMount() {
    this.fetchBlogsList()
  }

  fetchBlogsList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const jsonResponse = await response.json()
    const updatedData = jsonResponse.map(eachBlog => ({
      id: eachBlog.id,
      title: eachBlog.title,
      imageUrl: eachBlog.image_url,
      avatarUrl: eachBlog.avatar_url,
      topic: eachBlog.topic,
    }))
    this.setState({currentBlogsList: updatedData, isLoading: false})
  }

  render() {
    const {currentBlogsList, isLoading} = this.state

    let resultDisplay
    if (isLoading) {
      resultDisplay = (
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      )
    } else {
      resultDisplay = currentBlogsList.map(item => (
        <BlogItem blogData={item} key={item.id} />
      ))
    }

    return <div className="blog-list-container">{resultDisplay}</div>
  }
}

export default BlogsList
