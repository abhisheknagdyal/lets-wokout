import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

import WorkoutDetails from '../components/workoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const apiUrl = process.env.REACT_APP_API_URL
// const apiUrl = "http://localhost:4000"

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch( apiUrl + '/api/workouts', {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload:json})
      }
    }
    if(user){
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
        <div className='workouts'>
          {workouts && workouts.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home;