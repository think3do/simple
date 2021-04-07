package web.d.biz;

import java.util.List;

import web.d.dvo.CmmDVO;
import web.d.svo.CmmSVO;

public interface CmmDetailManageBVC {

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
    public List<CmmDVO> list(CmmSVO svo) throws Exception;
    

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
	

	/**
	 * 정보를 모두 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void deleteAll(CmmSVO cmmSVO) throws Exception;
}
