package web.d.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import web.d.dvo.CmmDVO;
import web.z.util.SearchVO;

@Repository("CmmManageDAO")
public class CmmManageDAO extends EgovAbstractDAO {


    /**
     * 공통코드를 등록 한다.
     *
     * @param board
     * @throws Exception
     */
	public void insert(CmmDVO dvo) throws Exception {
		
		insert("CmmManageDAO.insert", dvo);
	}

	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 *
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<CmmDVO> selectList(SearchVO searchVO) throws Exception {
		return (List<CmmDVO>) list("CmmManageDAO.selectList", searchVO);
	}

	/**
	 * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	public int selectTotalCnt(SearchVO searchVO) throws Exception {
		return (Integer)select("CmmManageDAO.selectTotalCnt", searchVO);
	}


	/**
	 * 상세 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	public CmmDVO detail(CmmDVO dvo) throws Exception {
		return (CmmDVO)select("CmmManageDAO.selectDetail", dvo);
	}
	

    /**
     * 공통코드를 수정 한다.
     *
     * @param board
     * @throws Exception
     */
	public void update(CmmDVO dvo) throws Exception {
		
		update("CmmManageDAO.update", dvo);
	}
	
    /**
     * 공통코드를 삭제 한다.
     *
     * @param board
     * @throws Exception
     */
	public void delete(CmmDVO dvo) throws Exception {
		
		update("CmmManageDAO.delete", dvo);
	}
	
	
	
	
}
