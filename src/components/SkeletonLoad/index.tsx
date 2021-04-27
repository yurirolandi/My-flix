import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonVideo = () => {
   return (
      <div style={{ margin: '1rem' }}>
         <SkeletonTheme color='#d7d7d7' highlightColor='#dfd9d9'> 
            <Skeleton height={180} />
            <div>
               <Skeleton
                  style={{ margin: '0.5rem' }}
                  circle
                  height={40}
                  width={40}
               />
               <Skeleton height={40} width='75%' />
            </div>
         </SkeletonTheme>
      </div>
   )
}

export default SkeletonVideo
