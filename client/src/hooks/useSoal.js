import { useState, useEffect, useCallback } from 'react';
import { soalService } from '../services/api';

export const useSoal = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

  const fetchQuestions = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const res = await soalService.list({ ...filters, limit: 1 }); // limit 1 for latihan view
      setQuestions(res.data.data.questions);
      setPagination(res.data.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    questions,
    loading,
    pagination,
    fetchQuestions
  };
};
