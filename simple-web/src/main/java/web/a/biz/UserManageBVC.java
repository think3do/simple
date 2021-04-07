package web.a.biz;

import java.util.Map;

import web.a.dvo.UserDVO;
import web.a.svo.UserSVO;
import web.z.util.SearchVO;

public interface UserManageBVC {

	/**
	 * 고객정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void insert(UserSVO userSVO) throws Exception;

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
    public Map<String, Object> list(SearchVO searchVO) throws Exception;
    

	/**
     * 상세 조회 한다.
     *
     */
    public UserDVO detail(UserSVO userSVO) throws Exception;

    /**
	 * 고객정보를 수정 한다.
	 * 
	 */
	public void update(UserSVO svo) throws Exception;

	/**
	 * 고객정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void delete(UserSVO userSVO) throws Exception;
}
