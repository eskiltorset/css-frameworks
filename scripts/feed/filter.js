export async popular(){
    const mostComments = post.filter(post => post.comments.length > 0);
        console.log(mostComments);
};

// export async newest(){
    
// }

// export async oldest(){
    
// }