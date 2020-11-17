import { createSlice, nanoid } from '@reduxjs/toolkit'
import { subMinutes } from 'date-fns'

const actualDate = new Date()
const actualDateString = actualDate.toISOString()
const fiveMinAgo = subMinutes(actualDate, 5).toISOString()

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', user: 0, date: fiveMinAgo },
    { id: '2', title: 'Second Post', content: 'More text', user: 1, date: actualDateString }
]

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postUpdated } = postSlice.actions

export default postSlice.reducer
