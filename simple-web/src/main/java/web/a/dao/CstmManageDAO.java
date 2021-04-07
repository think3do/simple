package web.a.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import web.a.dvo.CstmDVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Repository("CstmManageDAO")
public class CstmManageDAO extends EgovAbstractDAO {


	/**
	 * 고객 사용자 정보 채번
	 * @return
	 * @throws Exception
	 */
	public String getId() throws Exception {
		
		String cstmUserNo = WebUtil.makeId((String)select("CstmManageDAO.ID"));
		
		return cstmUserNo;
	}

    /**
     * 고객정보를 등록 한다.
     *
     * @param board
     * @throws Exception
     */
	public void insertCstm(CstmDVO dvo) throws Exception {
		
		insert("CstmManageDAO.insert", dvo);
	}

	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<CstmDVO> selectListCstm(SearchVO searchVO) throws Exception {
		return (List<CstmDVO>) list("CstmManageDAO.selectList", searchVO);
	}

	/**
	 * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	public int selectTotalCnt(SearchVO searchVO) throws Exception {
		return (Integer)select("CstmManageDAO.selectTotalCnt", searchVO);
	}


	/**
	 * 상세 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	public CstmDVO detailCstm(CstmDVO dvo) throws Exception {
		return (CstmDVO)select("CstmManageDAO.selectDetail", dvo);
	}
	

    /**
     * 고객정보를 수정 한다.
     *
     * @param board
     * @throws Exception
     */
	public void updateCstm(CstmDVO dvo) throws Exception {
		
		update("CstmManageDAO.update", dvo);
	}
	
    /**
     * 고객정보를 삭제 한다.
     *
     * @param board
     * @throws Exception
     */
	public void deleteCstm(CstmDVO dvo) throws Exception {
		
		update("CstmManageDAO.delete", dvo);
	}
	
	
	
	
}
