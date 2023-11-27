import { client } from "../client"

export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id =='${userId}']`
    return query
}

export const Category=[
  {
    name: 'Coding',
    image: 'https://i.pinimg.com/564x/20/68/d0/2068d0ec2ff20495819bc512149fe491.jpg'
  },

  {
    name: 'Art',
    image: 'https://images.pexels.com/photos/2086361/pexels-photo-2086361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    name: 'Music',
    image: 'https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg'
  },

  {
    name: 'Movies',
    image: 'https://i.pinimg.com/564x/c7/c4/eb/c7c4eb71f76a22ec48fd00633ad1e00c.jpg'
  },

  {
    name: 'Anime',
    image: 'https://i.pinimg.com/564x/26/f9/6b/26f96b0f73851d9eff391579033fd8a4.jpg'
  },




  {
    name: 'Graphics',
    image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    name: 'Folk Art',
    image: 'https://images.pexels.com/photos/19006224/pexels-photo-19006224/free-photo-of-colorful-handmade-traditional-vases.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    name: 'Digital Art',
    image: 'https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },


  {
    name: 'Gaming',
    image: 'https://images.pexels.com/photos/9100862/pexels-photo-9100862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    name: 'Imaging',
    image: 'https://images.pexels.com/photos/1744663/pexels-photo-1744663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Vehicles',
    image: 'https://i.pinimg.com/564x/55/c5/ef/55c5efd374577570c0587d2cefbb385d.jpg'
  },

  
 

  {
    name: 'Other',
    image: 'https://img.freepik.com/free-photo/reach-out-social-platform-connected-arrow_53876-127611.jpg?w=996&t=st=1699909842~exp=1699910442~hmac=dce7440276f49e04de985d36e439bba3379e87179b1f6563d5dce1e2774e4be7'
  },

  

]

export const searchQuery = (searchTerm) => {
    const query = `*[_type == 'post' && title match '${searchTerm}*'|| category match'${searchTerm}*' || about match '${searchTerm}*'|| userId match '${searchTerm}*']{
        image{
            asset-> {
                url,
                
                
            },
        },
            _id,
            destination,
            postedBy ->{
                _id,
                userName,
                image
            },
            save[]{
                _key, 
                postedBy -> {
                    _id,
                    userName,
                    image
                },
            },
        
    
        }`

    return query
}

export const feedQuery = ` *[_type == 'post'] | order(_createdAt desc) {
  image {
    asset -> {
      url,
    },
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key, 
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}
`

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const postDetailMorePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
  

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url,
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image,
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
      },
    },
  }`;
  return query;
};

export const userSavedPostsQuery = async (userId) => {
  const query = `*[_type == 'post' && defined(save) && '${userId}' in save[].userId] | order(_createdAt desc) {
    image {
      asset-> {
        url
      }
    },
    _id,
    destination,
    postedBy-> {
      _id,
      userName,
      image
    },
    save[] {
      _key, 
      postedBy-> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};
