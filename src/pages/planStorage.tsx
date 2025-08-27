import React from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase.ts';
import { useEffect, useState } from 'react';
//import { SelectedPlan } from '../components/selectedPlan.tsx';
import '../styles/planStorage.css';

const planStorage: React.FC = () => {
    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('no user');

        const fetchData = async () => {
            const plans = await getDocs(collection(db, 'users', uid, 'lessonPlans'));
            const data = plans.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPlans(data);
        };

        fetchData();
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'lessonplans', id));
            setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
            console.log('Deleted successfully');
        } catch (e) {
            console.error('error:', e);
        }
    }

  // Completely blank page that still fills the space
  return (
  <>
    <div className="min-h-screen bg-slate-800">
        <div>
            <h2 className='p-5 text-xl]'>Lesson Plans</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
            {plans.map(plan => {
                const isExpanded = selectedPlan === plan.id;
                
                return (
                    <div key={plan.id} className='border rounded-lg p-4 min-h-60 shadow hover:shadow-md self-start'>
                        <h2 className='text-xl  font-bold mb-2'>{plan.lessonPlanName}</h2>
                        <p className='text-sm '>
                            {isExpanded ? plan.lessonPlan : plan.lessonPlan.slice(0,80) + '...'}
                        </p>
                        <div>
                            <button onClick={() => setSelectedPlan(isExpanded ? null : plan.id)}>{isExpanded ? 'Hide' : 'View'}</button>
                            <button onClick={() => handleDelete(plan.id)}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
   
  </>
  )
};

export default planStorage;