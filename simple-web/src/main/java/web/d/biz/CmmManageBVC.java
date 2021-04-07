package web.d.biz;

import java.util.Map;

import web.d.dvo.CmmDVO;
import web.d.svo.CmmSVO;
import web.z.util.SearchVO;

public interface CmmManageBVC {

	/**
	 * 정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void insert(CmmSVO cmmSVO) throws Exception;

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
    public Map<String, Object> list(SearchVO searchVO) throws Exception;
    

	/**
     * 상세 조회 한다.
     *
     */
    public CmmDVO detail(CmmSVO cmmSVO) throws Exception;

    /**
	 * 정보를 수정 한다.
	 * 
	 */
	public void update(CmmSVO svo) throws Exception;

	/**
	 * 정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void delete(CmmSVO cmmSVO) throws Exception;
}
