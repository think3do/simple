package web.a.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import web.a.dvo.UserDVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Repository("UserManageDAO")
public class UserManageDAO extends EgovAbstractDAO {


	/**
	 *  사용자 정보 채번
	 * @return
	 * @throws Exception
	 */
	public String getId() throws Exception {
		
		String userNo = WebUtil.makeId((String)select("UserManageDAO.ID"));
		
		return userNo;
	}

    /**
     * 정보를 등록 한다.
     *
     * @param board
     * @throws Exception
     */
	public void insert(UserDVO dvo) throws Exception {
		
		insert("UserManageDAO.insert", dvo);
	}

	/**
	 * 목록을 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<UserDVO> selectList(SearchVO searchVO) throws Exception {
		return (List<UserDVO>) list("UserManageDAO.selectList", searchVO);
	}

	/**
	 * 전체 건수를 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	public int selectTotalCnt(SearchVO searchVO) throws Exception {
		return (Integer)select("UserManageDAO.selectTotalCnt", searchVO);
	}


	/**
	 * 상세 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */
	public UserDVO detail(UserDVO dvo) throws Exception {
		return (UserDVO)select("UserManageDAO.selectDetail", dvo);
	}
	

    /**
     * 정보를 수정 한다.
     *
     * @param board
     * @throws Exception
     */
	public void update(UserDVO dvo) throws Exception {
		
		update("UserManageDAO.update", dvo);
	}
	
    /**
     * 정보를 삭제 한다.
     *
     * @param board
     * @throws Exception
     */
	public void delete(UserDVO dvo) throws Exception {
		
		update("UserManageDAO.delete", dvo);
	}
	
}
